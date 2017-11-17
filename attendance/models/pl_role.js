/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('pl_role', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		role_name: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		role_code: {
			type: DataTypes.STRING(36),
			allowNull: true
		},
		role_type: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		pl_orgid: {
			type: DataTypes.STRING(36),
			allowNull: true
		},
		useable: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		remarks: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		role_level: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: '0'
		}
	}, {
		tableName: 'pl_role',
		timestamps: false,
		freezeTableName: true
	});
};
