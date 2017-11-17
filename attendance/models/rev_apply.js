/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('rev_apply', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		review_name: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		personid: {
			type: DataTypes.STRING(36),
			allowNull: true
		},
		review_code: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		template_code: {
			type: DataTypes.STRING(50),
			allowNull: true,
			references: {
				model: 'rev_template',
				key: 'template_code'
			}
		},
		create_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		approverids: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		send_personids: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		level: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '1'
		},
		is_done: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0'
		},
		form_json: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'rev_apply',
		timestamps: false,
		freezeTableName: true
	});
};
