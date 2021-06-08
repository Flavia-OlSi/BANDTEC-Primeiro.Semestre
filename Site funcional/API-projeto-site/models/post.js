'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Post = sequelize.define('Post',{	
		idPost: {
			field: 'idPost',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},	
		fkUsuario: {
			field: 'fkUsuario',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},	
        dataPost: {
			field: 'dataPost',
			type: DataTypes.DATE,
			allowNull: true,
            primaryKey: true
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
        fkTitulo: {
            field: 'fkTitulo',
            type: DataTypes.INTEGER,
            allowNull: false
        }
	}, 
	{
		tableName: 'post', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Post;
};
