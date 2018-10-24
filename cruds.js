
var casual = require("casual");
var Sequelize = require("sequelize");

var conexionMysql = new Sequelize('dual_spa','root','',{dialect: "mysql"});

const gac = {
    id: casual.uuid,              
    nombre: casual.name,        
    apellido_pa: casual.first_name,   
    apellido_ma : casual.last_name,   
    telefono: casual.phone,    
    correo: casual.email,       
    calle: casual.street,        
    num_casa: casual.integer(from = 1, to = 10000),      
    colonia_region: casual.state_abbr,
    cp: casual.building_number,
    ciudad: casual.city
}

// const vec_generados=[];

// var generaInsercionAgenda = num_generar =>{
//     for(var i=0 ; i<=num_generar ; i++){
//         vec_generados[i]=genera_agenda_casual;
//         console.log(vec_generados[i]);
//     }
// }

const insert_auto = () =>  `insert into agenda values( '${gac.id}','${gac.nombre}','${gac.apellido_pa}', '${gac.apellido_ma}','${gac.telefono}','${gac.correo}','${gac.calle}', ${gac.num_casa},'${gac.colonia_region}', '${gac.cp}','${gac.ciudad}')`;

const insert = (id=gac.id, nombre, ap_pa, ap_ma, tel, cor, calle, n_casa, col, cp, ciudad) => `insert into agenda values('${id}','${nombre}','${ap_pa}','${ap_ma}', '${tel}', '${cor}', '${calle}', ${n_casa}, '${col}', '${cp}','${ciudad}')`;

const selectById = (value) => `select * from agenda where id = '${value}'`;

const selectAll = () => 'select * from agenda';

const deleteAny = (id_c) => `delete from agenda where id = '${id_c}'`;

const updateAny = (id_ct,nombre, ap_pa, ap_ma, tel, cor, calle, n_casa, col, cp, ciudad) => `update agenda set nombre='${nombre}', apellido_pa='${ap_pa}', apellido_ma='${ap_ma}', telefono='${tel}', correo='${cor}', calle='${calle}', num_casa=${n_casa}, colonia_region='${col}', cp='${cp}', ciudad='${ciudad}' where id='${id_ct}'`;


const strQueryInsert = insert_auto();
const strQuery2 = insert("123",'Jose Alejandro','Lopez','Flores','922-155-2556','aleflo_1996@outlook.com','Jose Vasconceloz','40','Ferrocarrilera','96210','jaltipan');
var strQueryselectAny = selectById('21ce0c69-b296-4507-9ee5-95756e02ab9c');
const strQuerySelectAll = selectAll();
var strQueryDeleteAny = "";
var strQueryUpdateAny = "";


const tryConection = () => {
    conexionMysql.authenticate()
    .then(() => {
        console.log("Conexion establecida");
    })
    .catch(err => {
        console.log(`Error al intentar conectar: ${err}`);
    })
}

const insertaContacto = () => {
    conexionMysql.query( strQueryInsert , {type: Sequelize.QueryTypes.insert} )
        .then(() => {
            console.log("Insercion exitosa");
        })
        .catch(err => {
            console.log(`Error al intentar conectar: ${err}`);
        })
}

const viewAllContac = () => {
    conexionMysql.query( strQuerySelectAll , {type: Sequelize.QueryTypes.SELECT} )
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(`Error al intentar visulizar todos: ${err}`);
    })
}

const viewAnyContac = (idContac) => {
    strQueryselectAny = selectById(idContac);
    conexionMysql.query(strQueryselectAny , {type : Sequelize.QueryTypes.SELECT})
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(`Error al intentar visulizar al contacto con id (${idContac}) : ${err}`);
    })
}

const deleteAnyContac = (id_contact) => {
    strQueryDeleteAny = deleteAny(id_contact);
    conexionMysql.query(strQueryDeleteAny, {type : Sequelize.QueryTypes.DELETE})
    .then(() => {
        console.log(`Se elimino exitosamente al contacto: ${id_contact}`);
    })
    .catch(err => {
        console.log(`Error al intentar eliminar al contacto con id (${id_contact}) : ${err}`);
    })
}

const updateAnyContact = (id_contact,nombre, ap_pa, ap_ma, tel, cor, calle, n_casa, col, cp, ciudad) => {
    strQueryUpdateAny = updateAny(id_contact,nombre, ap_pa, ap_ma, tel, cor, calle, n_casa, col, cp, ciudad);
    conexionMysql.query(strQueryUpdateAny, {type : Sequelize.QueryTypes.UPDATE})
    .then(() => {
        console.log(`Se actualizo exitosamente al contacto: ${id_contact}`);
    })
    .catch(err => {
        console.log(`Error al intentar eliminar al contacto con id (${id_contact}) : ${err}`);
    })
}

updateAnyContact('f43a7988-53b6-4b41-95dd-49dda7aeaa45','Lulu','Ruiz','Wilkinson','358-727-20','Sadie.Deckow@Peter.us','Schneider Walks',1425,'Centro','26','South Stephanie');