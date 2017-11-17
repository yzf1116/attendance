/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sys_annex', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		businesskey: {
			type: DataTypes.STRING(36),
			allowNull: true
		},
		realpath: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		userid: {
			type: DataTypes.STRING(36),
			allowNull: true
		},
		clientid: {
			type: DataTypes.STRING(36),
			allowNull: true
		},
		create_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		type: {
			type: DataTypes.STRING(50),
			allowNull: true
		}
	}, {
		tableName: 'sys_annex',
		timestamps: false,
		freezeTableName: true
	});
};
