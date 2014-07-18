class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  respond_to :json, :html
  def index
  	@users = User.all
  end

  def test
  	respond_with User.all
  end

  def create
  end
end
