import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import auth from '@config/auth';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IRequest {
    cpf: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        cpf: string;
    };
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('UsersTokensRepository')
        private usersTokensRepository: IUsersTokensRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider
    ) {}

    async execute({ cpf, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByCpf(cpf);
        const {
            secret_token,
            expires_in_token,
            secret_refresh_token,
            expires_in_refresh_token,
            expires_refresh_token_days,
        } = auth;

        if (!user) {
            throw new AppError('Cpf or password incorrect!');
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError('Cpf or password incorrect!');
        }

        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token,
        });

        const refresh_token = sign({ cpf }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token,
        });

        const refresh_token_expires_data = this.dateProvider.addDays(
            expires_refresh_token_days
        );

        await this.usersTokensRepository.create({
            refresh_token,
            user_id: user.id,
            expires_date: refresh_token_expires_data,
        });

        const returnToken: IResponse = {
            user: {
                name: user.name,
                cpf: user.cpf,
            },
            token,
            refresh_token,
        };

        return returnToken;
    }
}

export { AuthenticateUserUseCase };
