import {
  HttpStatus,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { OrchestraDto } from './orchestra.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Orchestra, OrchestraDocument } from './orchestra.schema';
import { UserService } from './../user/user.service';

@Injectable()
export class OrchestraService {
  constructor(
    @InjectModel(Orchestra.name) private orchModel: Model<OrchestraDocument>,
    private readonly userService: UserService,
  ) {}

  getAllOrchestras(): Promise<Orchestra[]> {
    return this.orchModel
      .find()
      .populate('members', ['firstName', 'lastName'])
      .exec();
  }

  async createNewOrchestra(orchDto: OrchestraDto) {
    const savedOrchestra = new this.orchModel(orchDto);
    try {
      await savedOrchestra.save();
      const creator = await this.userService.addOrchestraToUser(
        savedOrchestra.creator_id,
        savedOrchestra._id,
      );

      const { password, ...result } = creator.toObject();
      return {
        success: true,
        status: HttpStatus.CREATED,
        user: result,
      };
    } catch (err) {
      console.log(err);
      throw new ServiceUnavailableException();
    }
  }

  deleteOrchestra(id: string) {
    return this.orchModel.deleteOne({ _id: id }).exec();
  }

  deleteMany(deleteCriteria: any) {
    return this.orchModel.deleteMany(deleteCriteria);
  }

  updateOrchestra(id: string, orchDto: OrchestraDto) {
    return this.orchModel.updateOne({ _id: id }, orchDto).exec();
  }

  async addMember(id: string, userId: string): Promise<Orchestra> {
    const query: any = { _id: new mongoose.Types.ObjectId(id) };
    const orchestra = await this.orchModel.findOne(query);
    const userObjectId = new mongoose.Types.ObjectId(userId);
    orchestra.members.push(userObjectId);
    await orchestra.save();
    return await orchestra.populate('members', ['firstName', 'lastName']);
  }

  async deleteMember(orchestraId: string, userId: string): Promise<Orchestra> {
    const orchestra = await this.orchModel.findById(orchestraId);
    const filteredMembers = orchestra.members.filter((member: any) => {
      return member.toString() !== userId;
    });
    orchestra.members = filteredMembers;

    await orchestra.save();
    return await orchestra.populate('members', ['firstName', 'lastName']);
  }
}
function addOrchestraToUser(creator_id: string, _id: any) {
  throw new Error('Function not implemented.');
}
