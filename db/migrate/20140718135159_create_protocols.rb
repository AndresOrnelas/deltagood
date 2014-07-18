class CreateProtocols < ActiveRecord::Migration
  def change
    create_table :protocols do |t|
      t.string :name
      t.integer :counter
      t.text :steps

      t.timestamps
    end
  end
end
