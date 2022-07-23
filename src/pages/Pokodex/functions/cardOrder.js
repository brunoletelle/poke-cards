
export default function cardOrder(pokomons, value){
    switch(value){
        case "Tipo":
        return (pokomons.sort(function (a, b) {
            
            if (a.type[0].type.name > b.type[0].type.name) {
                return 1;
            }
            if (a.type[0].type.name < b.type[0].type.name) {
                return -1;
            }
            return 0;
            }))
        
        case "Nombre":
            return(pokomons.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
                }))

        case "Nivel":
        return(pokomons.sort(function (a, b) {
            if (a.level > b.level) {
                return 1;
            }
            if (a.level < b.level) {
                return -1;
            }
            return 0;
            }))
        
        case "DV":
            return(pokomons.sort(function (a, b) {
                if (a.DV > b.DV) {
                return 1;
                }
                if (a.DV < b.DV) {
                return -1;
                }
                return 0;
            }))
        default:
            return(pokomons.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
                }))
    }
}
