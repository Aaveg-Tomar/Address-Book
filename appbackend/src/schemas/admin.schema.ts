import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { HydratedDocument } from 'mongoose';

export type AdminAppDocument = HydratedDocument<AdminApp>;


@Schema({
    timestamps:true,
})
export class AdminApp{
    @Prop()
    email : string;

    @Prop()
    password : string;

    @Prop()
    token: string;

    @Prop()
    role: string;

  
}


export const AdminAppSchema = SchemaFactory.createForClass(AdminApp);