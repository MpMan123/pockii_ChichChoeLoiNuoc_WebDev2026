import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Progress } from 'antd';

const FinancialQuiz = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    const questions = [
        {
            title: "Question 1 of 3",
            text: "When considering a 'Soft Landing' for the economy, which metric is most carefully monitored by the central bank?",
            options: [
                "Stock market daily fluctuations",
                "Unemployment rate combined with inflation",
                "Cryptocurrency market cap",
                "International trade deficit"
            ]
        },
        {
            title: "Question 2 of 3",
            text: "Which of the following is typically a consequence of raising interest rates too aggressively?",
            options: [
                "A hard landing (recession)",
                "Immediate hyperinflation",
                "Increased business hiring",
                "Lower national debt"
            ]
        }
    ];

    const handleNext = () => {
        if (selectedOption !== null) {
            if (currentStep < questions.length - 1) {
                setIsAnimatingOut(true);
                setTimeout(() => {
                    setCurrentStep(prev => prev + 1);
                    setSelectedOption(null);
                    setIsAnimatingOut(false);
                }, 300); // 300ms transition time
            } else {
                // Navigate to completion
                navigate('/quizzes/complete');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in relative max-w-2xl mx-auto w-full">
            <div className={`glass bg-white p-8 md:p-12 rounded-[2rem] w-full shadow-lg transition-all duration-300 transform ${isAnimatingOut ? 'opacity-0 -translate-x-10 scale-95' : 'opacity-100 translate-x-0 scale-100'}`}>
                <div className="flex items-center gap-4 mb-8">
                    <Progress 
                        percent={((currentStep) / questions.length) * 100} 
                        showInfo={false} 
                        strokeColor="var(--color-primary)" 
                        trailColor="#F1F5F9" 
                        strokeWidth={8} 
                        className="flex-1 m-0"
                    />
                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider shrink-0">{questions[currentStep].title}</span>
                </div>

                <h2 className="font-heading text-2xl md:text-3xl text-primary-dark leading-tight mb-8">
                    {questions[currentStep].text}
                </h2>

                <div className="flex flex-col gap-3 mb-10">
                    {questions[currentStep].options.map((opt, idx) => (
                        <Button 
                            key={idx}
                            onClick={() => setSelectedOption(idx)}
                            className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 text-sm md:text-base font-semibold h-auto flex justify-start
                                ${selectedOption === idx 
                                    ? 'border-primary bg-primary/5 text-primary shadow-sm transform scale-[1.01]' 
                                    : 'border-[#E2E8F0] bg-white text-text hover:!border-primary/30 hover:!bg-[#F8FAFC]'
                                }`}
                        >
                            {opt}
                        </Button>
                    ))}
                </div>

                <div className="flex justify-between items-center border-t border-black/5 pt-6 mt-auto">
                    <Button type="text"
                        className="text-text-muted font-bold text-sm tracking-wide hover:!text-text hover:!bg-transparent transition-colors px-0"
                        onClick={() => navigate('/quizzes')}
                    >
                        CANCEL
                    </Button>
                    <Button 
                         type="primary"
                         className="px-8 h-12 text-base rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none bg-primary hover:!bg-primary-dark border-none font-bold"
                         disabled={selectedOption === null}
                         onClick={handleNext}
                    >
                        {currentStep === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FinancialQuiz;
