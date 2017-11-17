/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('rev_custom', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		form_json: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		personid: {
			type: DataTypes.STRING(36),
			allowNull: true
		},
		templateid: {
			type: DataTypes.STRING(36),
			allowNull: true
		},
		approverid: {
			type: DataTypes.STRING(36),
			allowNull: true
		},
		create_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		review_code: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		review_status: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		}
	}, {
		tableName: 'rev_custom',
		timestamps: false,
		freezeTableName: true
	});
};
