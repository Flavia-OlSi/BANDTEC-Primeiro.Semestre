'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Avaliacao = sequelize.define('Avaliacao',{
		fkTitulo: {
			field: 'fkTitulo',
			type: DataTypes.INTEGER,
			primaryKey: true
		},		
        fkUsuario: {
			field: 'fkUsuario',
			type: DataTypes.INTEGER,
			allowNull: false,
            primaryKey: true
		},
		nota: {
			field: 'nota',
			type: DataTypes.INTEGER,
			allowNull: false,
		}
	}, 
	{
		tableName: 'avaliacao', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Avaliacao;
};
