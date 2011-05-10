class AddSessionsTable < ActiveRecord::Migration
  def self.up
    create_table :core_sessions do |t|
      t.string :session_id, :null => false
      t.text :data
      t.timestamps
    end

    add_index :core_sessions, :session_id
    add_index :core_sessions, :updated_at
  end

  def self.down
    drop_table :core_sessions
  end
end
