import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository"

interface ISettingsCreate{
    chat: boolean;
    username: string;
}

class SettingsService {

    async create({ chat,username } : ISettingsCreate){
        const settingsRepository = getCustomRepository(SettingsRepository);

        const userAlreadyExist = await settingsRepository.findOne({
            username,
        });
    
        if (userAlreadyExist){
            throw new Error("Usuário já existente!")
        }

        const settings = settingsRepository.create({
            chat,
            username
        });
    
        await settingsRepository.save(settings);
    }
}

export { SettingsService }