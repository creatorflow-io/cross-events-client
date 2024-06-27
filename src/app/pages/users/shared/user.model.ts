export interface UserRecord{
    Id: string,
    UserName: string,
    Name: string,
    FirstName: string,
    Surname: string,
    Email: string,
    PhoneNumber: string,
    Roles: Array<string>
}

export class UserModel implements UserRecord{
    Id: string = '';
    UserName: string = '';
    Name: string = '';
    FirstName: string = '';
    Surname: string = '';
    Email: string = '';
    PhoneNumber: string = '';
    Roles: Array<string> = [];
}

export class UserCreateModel implements UserRecord{
    Id: string = '';
    UserName: string = '';
    Name: string = '';
    FirstName: string = '';
    Surname: string = '';
    Email: string = '';
    PhoneNumber: string = '';
    Roles: Array<string> = [];
    Password: string = '';
    ConfirmPassword: string = '';
}

export class UserUpdateModel{
    Id: string = '';
    UserName: string = '';
    Name: string = '';
    FirstName: string = '';
    Surname: string = '';
    Email: string = '';
    PhoneNumber: string = '';
}

export class UserRolesModel{
    UserName: string = '';
    Roles: Array<string> = [];
}