# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140725150936) do

  create_table "posts", force: true do |t|
    t.string   "text"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "protocols", force: true do |t|
    t.string   "name"
    t.integer  "counter"
    t.text     "steps"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "runs", force: true do |t|
    t.integer  "counter"
    t.text     "inputs"
    t.text     "times"
    t.text     "changeList"
    t.integer  "user_id"
    t.integer  "protocol_id"
    t.integer  "currentStep"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "protocolName"
  end

  create_table "solutions", force: true do |t|
    t.boolean  "bought"
    t.integer  "user_id"
    t.float    "quantity"
    t.string   "name"
    t.integer  "lot"
    t.float    "concentration"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "expiration"
    t.text     "reagents"
    t.string   "UserName"
  end

  create_table "users", force: true do |t|
    t.string   "name"
    t.integer  "age"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

end
