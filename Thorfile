require 'fileutils'

# This just instructs the Thor task display where to look for
# thor tasks. Note that they would not show up with a rake -T
# but instead with a thor -T. Putting them in lib/tasks allows
# them to live side by side with your legacy rake tasks.
Dir['./scripts/**/*.thor'].each { |f| load f }
