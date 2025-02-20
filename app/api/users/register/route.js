



import Connection from '@/database/config';
import User from '@/models/user';
import bcryptjs from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

// Ensure database connection
Connection();

export const POST = async (req) => {
    try {
        const body = await req.json();
        const { name, username, password } = body;

        if (!name || !username || !password) {
            return NextResponse.json({ message: "Name, Username, and Password are required" }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return NextResponse.json({ message: "Username already exists" }, { status: 409 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(12);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const newUser = new User({
            name,
            username,
            password: hashedPassword,
        });

        await newUser.save();

        return NextResponse.json({ message: "User saved successfully" }, { status: 201 });
    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
};
