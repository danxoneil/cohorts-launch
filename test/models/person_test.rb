require 'test_helper'

class PersonTest < ActiveSupport::TestCase

  test "should create new from wufoo params" do
    new_person = Person.initialize_from_wufoo(wufoo_params)
    assert new_person.save
    assert_equal "Jim", new_person.first_name
    assert_equal "jim@example.com", new_person.email_address
  end
  
  test "should map wufoo device description to correct id" do
    new_person = Person.initialize_from_wufoo(wufoo_params.update('Field20' => "Smart phone"))
    assert new_person.save
    assert_equal 2, new_person.primary_device_id
  end
end
