import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/Users";
import connectdb from "../../../utils/connectMongo";
const CryptoJS = require('crypto-js')


export default NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60
    },
    callbacks: {
        async jwt({ token, user }) {
            if(user?._id) token._id = user._id;
            if(user?.type) token.type = user.type;
            return token;
        },
        async session({ session, token }) {
            if(token?._id) session.user._id = token._id;
            if(token?.type) session.user.type = token.type;
            return session;
        },
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials, req){

                const { email, password } = credentials;

                const validateEmail = (email) => {
                    return String(email)
                        .toLowerCase()
                        .match(
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        );
                };

                if(validateEmail(email)){
                    await connectdb();
                    const user = await User.findOne({ email });

                    if(user){
                        const bytes = CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_JS_SECRET_KEY);
                        const decryptPass = bytes.toString(CryptoJS.enc.Utf8);
                        if(decryptPass == password){
                            const newUser = {
                                _id: user._id,
                                name: `${user.firstName} ${user.lastName}`,
                                email: user.email,
                                image: user.avatar,
                                type: user.type,
                            };
                            return newUser
                        } else {
                            throw new Error('Invalid password');
                        }

                    } else {
                        throw new Error('User not found');
                    }

                } else {
                    throw new Error('Invalid Email');
                }

            }
        })
    ]

})