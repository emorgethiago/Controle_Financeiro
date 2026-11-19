import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TransacoesModule } from "./transacoes/transacoes.module";

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI ||
        "mongodb+srv://lucasalberto0309_db_user:Th040783@cluster0.mwawcqr.mongodb.net/",
    ),
    TransacoesModule,
  ],
})
export class AppModule {}
