//包装函数
module.exports = function(grunt){	
	//任务配置,所有插件的配置信息
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		//uglify插件的配件信息(压缩)
		uglify:{
			options:{
				stripBanners:true,
				banner:'/*! <%=pkg.name%>-<%=pkg.version%>.js <%=grunt.template.today("yyyy-mm-dd")%> */\n'
			},
			build:{
				src:'dist/js/<%= pkg.name %>.js',
				dest:'build/<%=pkg.name%>-<%=pkg.version%>.min.js'				
			}		
		},
		//jshint(javascript语法错误检查)
		jshint:{
			build:["src/*.js"],
			options:{
				jshintrc:"src/.jshintrc"
			}
				
		},
		//实时监控文件变化、调用相应的任务重新执行
		watch: {
		  build: {
			files:['src/*.js','src/*.css'],
			tasks: ['jshint', 'uglify'],
			options:{spawn:false}
		  }
		 
		},
		//合并多个文件的代码到一个文件中
		concat: {
		  options: {
			banner:'/*! <%=pkg.name%>-<%=pkg.version%>.js <%=grunt.template.today("yyyy-mm-dd")%> */\n',
			stripBanners: false
		  },
		  bootstrap: {
			src: [
			  'src/test.js',
			  'src/test2.js'        
			],
			dest: 'dist/js/<%= pkg.name %>.js'
		  }
		}
		
	});
	
	
	//告诉grunt 我们将使用插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
		
	
	//告诉grunt当我们在终端中输入grunt时需要做些什么(注意先后顺序)
	grunt.registerTask('default',['jshint','concat','uglify','watch']);
	
};