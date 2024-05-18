import User from "@/app/model/userModel";
import { connect } from "@/database/dbCollection";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

connect();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, email, password } = await body.user;
        let already = await User.findOne({ email });
        if (already){
            return NextResponse.json({ exist: "User already exists" }, { status: 400 })
        }
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
        await User.create({
            username,
            email,
            password: hashPassword,
        })
        return NextResponse.json({message:"user Registered successfully!"},{status:201})


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
