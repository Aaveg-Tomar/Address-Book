import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { HydratedDocument } from 'mongoose';

export type UserAppDocument = HydratedDocument<UserApp>;


@Schema({
    timestamps:true,
})
export class UserApp{
    @Prop()
    name : string;

    @Prop()
    phone : number;

    @Prop()
    age : number;

    @Prop()
    email : string;
  
}


export const UserAppSchema = SchemaFactory.createForClass(UserApp);