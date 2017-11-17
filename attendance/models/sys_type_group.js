/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sys_type_group', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		typegroupcode: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		typegroupname: {
			type: DataTypes.STRING(50),
			allowNull: true
		}
	}, {
		tableName: 'sys_type_group',
		timestamps: false,
		freezeTableName: true
	});
};
