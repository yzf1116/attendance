/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sys_depart', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		departname: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		parentdepartid: {
			type: DataTypes.STRING(36),
			allowNull: true
		},
		org_code: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		org_type: {
			type: DataTypes.STRING(10),
			allowNull: true
		}
	}, {
		tableName: 'sys_depart',
		timestamps: false,
		freezeTableName: true
	});
};
