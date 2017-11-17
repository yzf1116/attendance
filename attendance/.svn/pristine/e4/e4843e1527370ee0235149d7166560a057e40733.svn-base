/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('pl_org', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		org_name: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		parentid: {
			type: DataTypes.STRING(36),
			allowNull: true
		},
		org_code: {
			type: DataTypes.STRING(64),
			allowNull: true
		},
		org_type: {
			type: DataTypes.STRING(50),
			allowNull: true
		}
	}, {
		tableName: 'pl_org',
		timestamps: false,
		freezeTableName: true
	});
};
