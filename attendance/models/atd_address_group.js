/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('atd_address_group', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		groupid: {
			type: DataTypes.STRING(36),
			allowNull: true,
			references: {
				model: 'atd_group',
				key: 'id'
			}
		},
		addressid: {
			type: DataTypes.STRING(36),
			allowNull: true,
			references: {
				model: 'atd_address',
				key: 'id'
			}
		}
	}, {
		tableName: 'atd_address_group',
		timestamps: false,
		freezeTableName: true
	});
};
