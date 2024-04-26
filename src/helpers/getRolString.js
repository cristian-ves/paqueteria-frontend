export const getRolString = (rol) => {
    let string;
    switch (rol) {
        case 1:
            string = "admin";
            break;
        case 2:
            string = "operador";
        case 3:
            string = "recepcionista";
        default:
            break;
    }
    return string;
};
