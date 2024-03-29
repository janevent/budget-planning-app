# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_06_01_203942) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "budgets", force: :cascade do |t|
    t.string "title"
    t.integer "total_income"
    t.integer "total_expenditure"
    t.integer "total_difference"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_budgets_on_user_id"
  end

  create_table "expenses", force: :cascade do |t|
    t.integer "amount"
    t.string "description"
    t.string "paymentable_type"
    t.bigint "paymentable_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["paymentable_type", "paymentable_id"], name: "index_expenses_on_paymentable_type_and_paymentable_id"
  end

  create_table "incomes", force: :cascade do |t|
    t.string "description"
    t.integer "amount"
    t.string "gainsable_type"
    t.bigint "gainsable_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["gainsable_type", "gainsable_id"], name: "index_incomes_on_gainsable_type_and_gainsable_id"
  end

  create_table "templates", force: :cascade do |t|
    t.string "title"
    t.integer "total_income"
    t.integer "total_expenditure"
    t.integer "total_difference"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_templates_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "budgets", "users"
  add_foreign_key "templates", "users"
end
