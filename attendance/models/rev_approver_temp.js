/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('rev_approver_temp', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		templateid: {
			type: DataTypes.STRING(36),
			allowNull: true,
			references: {
				model: 'rev_template',
				key: 'id'
			}
		},
		approverid: {
			type: DataTypes.STRING(36),
			allowNull: true,
			defaultValue: '1'
		},
		appr_level: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		}
	}, {
		tableName: 'rev_approver_temp',
		timestamps: false,
		freezeTableName: true
	});
};
