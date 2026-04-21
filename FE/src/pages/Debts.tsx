import { Home, Zap, CreditCard, ChevronRight } from 'lucide-react';
import { Button, Input, Select, DatePicker, InputNumber, Form, message } from 'antd';
import { createDebt } from '../services/debt.service';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchDebts } from '../services/debt.service';

interface Debt {
  debtname: string;
  initialprincipal: number;
  currentbalance: number;
  flatinteresrate: number;
  effectiveinterestrate: number;
  currency: string;
  priority: string;
  enddate: Date;
}

const Debts = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [debts, setDebts] = useState<Debt[]>([]);


  const handleCreateDebt = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        debtname: values.debtName,
        initialprincipal: values.initialPrincipal,
        flatinterestrate: values.interestRate,
        currentbalance: values.initialPrincipal,
        effectiveinterestrate: values.interestRate,
        currency: values.currency,
        priority: values.priority,
        enddate: values.dueDate.format('YYYY-MM-DD'),
      }

      const response = await createDebt(payload);
      if (response.status) {
        message.success("Tạo khoản nợ thành công!")
      }
      else {
        message.error("Lỗi khi tạo khoản nợ!");
      }
      form.resetFields();
    } catch (error) {
      console.error(error);
    }

  }


  useEffect(() => {
    const loadDebts = async () => {
      try {
        const response = await fetchDebts();
        setDebts(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    if (user) {
      loadDebts();
    }
  }, [user])
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass bg-white/60 p-6 rounded-2xl flex flex-col gap-2">
              <span className="text-xs font-semibold text-text-muted tracking-wide uppercase">TOTAL DEBT</span>
              <h3 className="text-3xl font-heading tracking-tight text-text">$142,850.00</h3>
            </div>
            <div className="glass bg-white/60 p-6 rounded-2xl flex flex-col gap-2">
              <span className="text-xs font-semibold text-text-muted tracking-wide uppercase">UPCOMING (30D)</span>
              <h3 className="text-3xl font-heading tracking-tight text-warning">$1,240.32</h3>
            </div>
            <div className="glass bg-white/60 p-6 rounded-2xl flex flex-col gap-2">
              <span className="text-xs font-semibold text-text-muted tracking-wide uppercase">AVERAGE APR</span>
              <h3 className="text-3xl font-heading tracking-tight text-success">4.2%</h3>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-heading text-primary-dark">Upcoming Bills</h3>
              <Button type="link" className="!p-0 text-text-muted hover:text-primary !h-auto">Sort by Priority</Button>
            </div>

            <div className="flex flex-col gap-4">
              {debts.map((debt, i) => (
                <div key={i} className="glass bg-white flex flex-col sm:flex-row items-start sm:items-center p-5 rounded-2xl gap-5 hover:-translate-y-0.5 hover:shadow-md transition-all">
                  {/* <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${debt.bg}`}>
                    {debt.icon}
                  </div> */}
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-text">{debt.debtname}</h4>
                    <p className="text-sm text-text-muted mt-1">{debt.initialprincipal}</p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1 shrink-0">
                    <h4 className="text-lg font-bold text-text">{debt.currentbalance} {debt.currency}</h4>
                    <span className={`badge ${debt.priority === 'High Priority' ? 'badge-warning' : ''}`}>{debt.priority}</span>
                  </div>
                  <Button
                    type={debt.currency as "primary" | "default"}
                    className={`mt-4 sm:mt-0 font-semibold w-full sm:w-auto h-10 px-6 rounded-xl ${debt.currency === 'primary' ? 'bg-primary hover:!bg-primary-dark border-none shadow-sm' : 'border-[#E2E8F0] hover:!border-primary hover:!text-primary'}`}
                  >
                    Pay Now
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="glass p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-primary/5 to-transparent">
                <div>
                  <h3 className="mb-2 text-lg font-heading text-primary-dark">Your path to freedom</h3>
                  <p className="text-muted text-sm max-w-md">Paying an extra $50/mo towards your Visa Gold Credit will make you debt-free 4 months earlier. Pockii recommends this adjustment.</p>
                </div>
                <Button type="primary" className="shrink-0 h-10 px-6 rounded-xl font-semibold bg-primary hover:!bg-primary-dark border-none shadow-sm flex items-center gap-2">
                  Apply Strategy <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-form-bg p-2 sm:p-6 rounded-3xl sticky top-8">
            <h3 className="mb-6 text-xl font-bold font-heading text-primary-dark">Add New Debt</h3>
            <Form
              form={form}
              layout='vertical'
              onFinish={handleCreateDebt}
              initialValues={{ priority: 'Medium' }}
            >
              <div className="mb-5 flex flex-col gap-1">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wide">DEBT LABEL</label>

                <Form.Item
                  className='!mb-1'
                  name="debtName"
                  rules={[
                    { required: true, message: 'Please enter debt name' },
                    { min: 3, message: 'Debt name must be at least 3 characters' },
                    { max: 50, message: 'Debt name must be at most 50 characters' },
                  ]}
                >
                  <Input
                    size="large"
                    className="bg-black/5 hover:bg-white focus:bg-white border-[#E2E8F0] rounded-xl text-sm transition-all"
                    placeholder="e.g. Student Loan"
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 !mb-1">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wide">INITIAL PRINCIPAL</label>
                  <Form.Item
                    className="mb-1"
                    name="initialPrincipal"
                    rules={[
                      { required: true, message: 'Please enter initial principal' },
                      { type: 'number', min: 0, message: 'Initial principal must be at least 0' },
                    ]}
                  >
                    <InputNumber
                      size="large"
                      prefix="$"
                      className="bg-black/5 hover:bg-white focus:bg-white border-[#E2E8F0] rounded-xl text-sm transition-all"
                      placeholder="0.00"
                    />
                  </Form.Item>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wide">INTEREST RATE</label>
                  <Form.Item
                    className="!mb-1"
                    name="interestRate"
                    rules={[
                      { required: true, message: 'Please enter interest rate' },
                      { type: 'number', min: 0, message: 'Interest rate must be at least 0' },
                    ]}
                  >
                    <InputNumber
                      size="large"
                      prefix="$"
                      className="bg-black/5 hover:bg-white focus:bg-white border-[#E2E8F0] rounded-xl text-sm transition-all"
                      placeholder="0.00"
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 !mb-1" >
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wide">DUE DATE</label>
                  <Form.Item
                    className="!mb-1"
                    name="dueDate"
                    rules={[
                      { required: true, message: 'Please select due date' },
                    ]}
                  >
                    <DatePicker
                      size="large"
                      className="w-full bg-black/5 hover:bg-white focus:bg-white border-[#E2E8F0] rounded-xl text-sm transition-all"
                    />
                  </Form.Item>
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wide">PRIORITY</label>
                  <Form.Item
                    name="priority"
                    rules={[
                      { required: true, message: 'Please select priority' },
                    ]}
                  >
                    <Select
                      size="large"
                      options={[
                        { value: 'Low', label: 'Low' },
                        { value: 'Medium', label: 'Medium' },
                        { value: 'High', label: 'High' },
                        { value: 'Critical', label: 'Critical' }
                      ]}
                      className="w-full"
                      rootClassName="rounded-xl"
                    />
                  </Form.Item>
                </div>
              </div>

              <Button
                type="primary"
                className="w-full !h-13 mt-4 text-[15px] !font-bold !text-text-button font-bold !rounded-full !bg-[#FFC896] hover:!bg-primary-dark border-none shadow-sm transition-transform hover:-translate-y-px"
                onClick={handleCreateDebt}
              >
                Record Debt
              </Button>


            </Form>
          </div>
        </div>
      </div >
    </div >
  );
};

export default Debts;
