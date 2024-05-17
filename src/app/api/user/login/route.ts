import User from "@/app/model/userModel";
import { connect } from "@/database/dbCollection";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    connect();

    try {
        const body = await req.json();
        const { email, password } = await body.user;
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ notFound: "User doesn't exist" }, { status: 400 })
        } else {
            const isPasswordMatch = await bcrypt.compare(password, user.password)

            if (!isPasswordMatch) {
                return NextResponse.json({ invalid: "Invalid password" }, { status: 400 })
            }
            const tokenData = {
                id:user._id,
                username:user.username,
                email:user.email
            }
            const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{ expiresIn:"1d"});
            let res = NextResponse.json({ message: `welcome Sir,${user.username}`, success: true }, { status: 200 });
            console.log(token+"<<<<<<<<000>>>>>>>>");
           await res.cookies.set("token", token, {httpOnly:true});
            console.log(res);
            return NextResponse.json({ message: `welcome Sir,${user.username}`, success: true }, { status: 200 });

        }
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });

    }
}