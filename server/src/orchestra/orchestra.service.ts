import { Injectable } from '@nestjs/common';
import { OrchestraDto } from './orchestra.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Orchestra, OrchestraDocument } from './orchestra.schema';


@Injectable()
export class OrchestraService {
    constructor(@InjectModel(Orchestra.name) private orchModel: Model<OrchestraDocument>) {}

    getAllOrchestras(): Promise<Orchestra[]> {
        return this.orchModel.find().exec();
    }

    createNewOrchestra(orchDto: OrchestraDto) {
        const savedOrchestra = new this.orchModel(orchDto);
        return savedOrchestra.save();
    }
 
    deleteOrchestra(id: string) {
        const query: any = { _id: new mongoose.Types.ObjectId(id) };
        return this.orchModel.deleteOne(query).exec();
    }

    deleteMany(deleteCriteria: any) {
    // return this.orchestraModel.deleteMany(deleteCriteria);
    }

    updateOrchestra(id: string, orchDto: OrchestraDto) {
        return this.orchModel.updateOne({ _id: id }, orchDto).exec();
      }
    













    // private orchestras = [{orchestra_name: 'Rock', creator_id: "a5142"},
    //                 {orchestra_name: 'Jazz', creator_id: "a1142"},
    //                 {orchestra_name: 'Pop', creator_id: "a2542"},
    //                 {orchestra_name: 'Star', creator_id: "a1042"},
    //                 {orchestra_name: 'local', creator_id: "a9842"},
    //                 ];
    // fetchOrchestra(){
    //     return this.orchestras;
    // }

    // createOrchestra(new_data: OrchestraDto){
    //     this.orchestras.push(new_data);
    // }


}
