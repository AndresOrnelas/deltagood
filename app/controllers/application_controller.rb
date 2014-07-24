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
  def protocoltype
    respond_with Protocol.find_by(name: params[:name])
  end

  def protocol
    respond_with Protocol.all
  end

  def run
    respond_with Run.all
  end

  def runtype
    respond_with Run.find_by(id: params[:id])
  end

  def runupdate
    @run = Run.find_by(id: params[:id])
    @run.update(inputs: params[:values])
    respond_with(new_run) do |format|
        format.json { render :json => new_run.as_json }
      end
  end
  
  def lastrun
    respond_with Run.where(protocol_id: params[:id]).last

  end

  def createrun
    puts "hahah"
    puts params[:protocolid]
    puts "james"
    @protocol = Protocol.find_by(id: params[:protocolid])
    puts @protocol
    puts "above is the protocol"
    @protocolcounter = @protocol.counter
    new_run = Run.create(protocol_id: params[:protocolid], counter: @protocolcounter, user_id: current_user.id, currentStep: 10)
    @protocol.update(counter: (@protocol.counter+1))
    puts "BELOW IS COUNTER AFTER ADDING"
    puts @protocol.counter
    respond_with(new_run) do |format|
        format.json { render :json => new_run.as_json }
      end
  end

  def user
    respond_with User.all
  end

  def create
    puts params[:text]
    # Create and save new post from data received from the client
    new_post = Post.create(text: params[:text])
    # new_post.text = params[:new_post][:title]
    # new_post.title = params[:new_post][:title][0...250] # Get only first 250 characters
    # new_post.contents = params[:new_post][:contents]

    # Confirm post is valid and save or return HTTP error
    # if new_post.valid?
    #   new_post.save!
    # else
    #   render "public/422", :status => 422
    #   return
    # end

    # Respond with newly created post in json format
    respond_with(new_post) do |format|
      format.json { render :json => new_post.as_json }
    end
  end

  def solutions
    puts params[:solution]

    respond_with Solution.where(name: params[:solution])
  end

# Pipet step and prepare solution step calls----------------------------------------------------------------
  def solutions
    puts Solution.where(name: params[:solution])
    respond_with Solution.where(name: params[:solution])
  end

  def updateSolutions
    puts params[:newVolume]
    puts params[:solutionNum]

    update_solution = Solution.find(params[:solutionNum]).update(quantity: params[:newVolume])
    respond_with(update_solution) do |format|
        format.json { render :json => update_solution.as_json }
      end
  end

  def newSolution
   new_solution = Solution.create(name: params[:solution], bought: false, user_id: current_user.id, quantity: params[:volume], reagents: params[:reagents])
   puts new_solution
   respond_with(new_solution) do |format|
       format.json { render :json => new_solution.as_json }
     end
 end
 def configure_permitted_parameters
      devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:name, :email, :password) }
  end
end
