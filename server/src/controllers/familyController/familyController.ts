import FamiliyUser from "@models/FamilyUser";
import { Request } from "hapi";

// ** POST ** //
const createFamilyUser = async (request: Request) => {
    interface Payload {
        name: string;
        userId: number;
    }
    try {
        const { name, userId } = request.payload as Payload;
        const exist = await FamiliyUser.findOne({
            where: {
                userId,
                name,
            },
        });

        if (exist) return { status: 400, err: "Family User already exists" };
        const familyUser = await FamiliyUser.create({
            name,
            userId,
        });

        return { status: 200, familyUser };
    } catch (err) {
        return { status: 400, err: (err as Error).message };
    }
};

export const familyUserController = {
    createFamilyUser,
};
