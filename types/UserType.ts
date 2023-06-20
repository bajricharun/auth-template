type User = {
    user_id: number;
    email: string;
    phone_number: string;
    password: string;
    o_auth_token: string;
    o_auth_verified: boolean;
    o_auth_last_refresh?: Date;
    jwt_token: string;
    jwt_token_last_refresh?: Date;
    user_name: string;
    user_last_name: string;
    address?: {
        city: string;
        street: string;
        streetNumber: number;
        nameOfFlatOwner: string;
        floor: number;
    };
    last_update: Date;
    created_on: Date;
};

export default User;
