import User from "../model/user.model.js"

export const createUser = async (req, res, next) => {
    try {
        const { name, age, address } = req.body;

        if (!name || !age || !address) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            })
        }

        const existingUser = await User.findUserByAddress(address);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        const result = await User.createUser({ name, age, address });
        res.status(200).json({
            success: true,
            message: "Create user successfully",
            data: result
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export const getAllUser = async (req, res, next) => {
    try {
        const users = await User.getAllUser();
        res.status(200).json({
            success: true,
            message: "Get all users successfully",
            data: users
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
}
