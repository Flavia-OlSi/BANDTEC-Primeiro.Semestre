'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Chamado = sequelize.define('Chamado',{
		idChamado: {
			field: 'idChamado',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		titulo: {
			field: 'titulo',
			type: DataTypes.STRING,
			allowNull: false
		},
        descricao: {
			field: 'descricao',
			type: DataTypes.STRING,
			allowNull: false
		},
		dataChamado: {
			field: 'dataChamado',
			type: DataTypes.DATE,
			allowNull: true
		},
		situacao: {
			field: 'situacao',
			type: DataTypes.STRING,
			allowNull: true
		},
		fkUsuario: {
			field: 'fkUsuario',
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, 
	{
		tableName: 'Chamado', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Chamado;
};
