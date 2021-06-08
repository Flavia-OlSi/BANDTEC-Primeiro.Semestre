'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Titulo = sequelize.define('Titulo',{
		idTitulo: {
			field: 'idTitulo',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		nome: {
			field: 'nome',
			type: DataTypes.STRING,
			allowNull: false
		},
        foto: {
			field: 'foto',
			type: DataTypes.STRING,
			allowNull: false
		},
		genero: {
			field: 'genero',
			type: DataTypes.STRING,
			allowNull: false
		},
		sinopse: {
			field: 'sinopse',
			type: DataTypes.STRING,
			allowNull: false
		},
		temporada: {
			field: 'temporada',
			type: DataTypes.INTEGER,
			allowNull: true
		},
		episodio: {
			field: 'episodio',
			type: DataTypes.INTEGER,
			allowNull: true
		},
		duracao: {
			field: 'duracao',
			type: DataTypes.STRING,
			allowNull: true
		},
		nacionalidade: {
			field: 'nacionalidade',
			type: DataTypes.STRING,
			allowNull: false
		},
		anoLancamento: {
			field: 'anoLancamento',
			type: DataTypes.STRING,
			allowNull: false
		},
		fkTipoDeEntretenimento: {
			field: 'fkTipoDeEntretenimento',
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, 
	{
		tableName: 'Titulo', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Titulo;
};
