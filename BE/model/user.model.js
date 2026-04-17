import supabase from "../config/supabase.js";

class User {
    static createUser = async (userData) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: userData.email,
                password: userData.password,
                options: {
                    data: {
                        name: userData.name,
                        age: userData.age,
                        address: userData.address,
                    },
                }
            })

            return { data, error };
        } catch (error) {
            console.log(error);
        }
    }

    static findUserByEmail = async (email) => {
        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();


        if (error) {
            throw error;
        }

        return user;
    }

    static findUserByAddress = async (address) => {
        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("address", address)
            .single();


        if (error) {
            throw error;
        }

        return user;
    }
}
export default User;