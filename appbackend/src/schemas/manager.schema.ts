import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { HydratedDocument } from 'mongoose';

export type ManagerAppDocument = HydratedDocument<ManagerApp>;


@Schema({
    timestamps:true,
})
export class ManagerApp{
    @Prop()
    email : string;

    @Prop()
    password : string;

    @Prop()
    token: string;
  
}


export const ManagerAppSchema = SchemaFactory.createForClass(ManagerApp);