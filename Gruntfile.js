//��װ����
module.exports = function(grunt){	
	//��������,���в����������Ϣ
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		//uglify����������Ϣ(ѹ��)
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
		//jshint(javascript�﷨������)
		jshint:{
			build:["src/*.js"],
			options:{
				jshintrc:"src/.jshintrc"
			}
				
		},
		//ʵʱ����ļ��仯��������Ӧ����������ִ��
		watch: {
		  build: {
			files:['src/*.js','src/*.css'],
			tasks: ['jshint', 'uglify'],
			options:{spawn:false}
		  }
		 
		},
		//�ϲ�����ļ��Ĵ��뵽һ���ļ���
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
	
	
	//����grunt ���ǽ�ʹ�ò��
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
		
	
	//����grunt���������ն�������gruntʱ��Ҫ��Щʲô(ע���Ⱥ�˳��)
	grunt.registerTask('default',['jshint','concat','uglify','watch']);
	
};