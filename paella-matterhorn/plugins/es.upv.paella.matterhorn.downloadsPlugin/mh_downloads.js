paella.plugins.DownloadsPlugin = Class.create(paella.TabBarPlugin,{
	getSubclass:function() { return 'downloadsTabBar'; },
	getName:function() { return 'es.upv.paella.matterhorn.downloadsPlugin'; },
	getTabName:function() { return paella.dictionary.translate('Downloads'); },
	getIndex:function() { return 30; },
	getDefaultToolTip:function() { return paella.dictionary.translate('Downloads'); },	
	
			
	domElement:null,
			
	checkEnabled:function(onSuccess) {
		onSuccess(true);
	},

	setup:function() {
		var mimeDict = {
			'video/avi':'AVI',
			'video/mp4':'MP4',
			'video/ogg':'OGG',
			'audio/mp3':'MP3',
			'audio/m4a':'M4A'
		};
		paella.dictionary.addDictionary(mimeDict);


		if (paella.utils.language()=="es") {
			var esDict = {
				'Downloads':'Descargas',			
				'Video file':'Fichero de video',
				'Audio file':'Fichero de audio',
			};
			paella.dictionary.addDictionary(esDict);
		}
	},
	buildContent:function(domElement) {
		this.domElement = domElement;
		this.loadContent();
	},
				
	action:function(tab) {
	},
					
	loadContent:function() {
		var container = document.createElement('div');
		container.className = 'downloadsTabBarContainer';

		
		var tracks = paella.matterhorn.episode.mediapackage.media.track;
		if (!(tracks instanceof Array)) { tracks = [tracks]; }
		
		for (var i=0; i<tracks.length; ++i) {
			var track = tracks[i];
			paella.debug.log(track.type);
			container.appendChild(this.createLink(track, i));
		}
		this.domElement.appendChild(container);
	},
	
	createLink:function(track, tabindexcount) {
		var elem = document.createElement('div');
		elem.className = 'downloadsLinkContainer';
		var link = document.createElement('a');
		link.className = 'downloadsLinkItem';
		link.innerHTML = this.getTextInfo(track);
		link.setAttribute('tabindex', 4000+tabindexcount);
		link.href = track.url;
		
		elem.appendChild(link);
		
		return elem;
	},
	
	getTextInfo:function(track){
		var text = '';
		
		if (track.video) {
			text = '<span class="downloadLinkText TypeFile Video">' + paella.dictionary.translate('Video file') + '</span>';
		}
		else if (track.audio){
			text = '<span class="downloadLinkText TypeFile Audio">' + paella.dictionary.translate('Audio file') + '</span>';
		}
		// track
		var trackText= '<span class="downloadLinkText Track">' + track.type + '</span>';
		
		// Resolution
		var resolution = '';
		if (track.video) {
			if ( track.video.resolution){
				resolution = track.video.resolution;
			}
			if (track.video.framerate){
				resolution +=  '@' + track.video.framerate + 'fps'; 
			}
		}
		
		// mimetype
		var mimetype = '';
		if (track.mimetype) {
			mimetype = track.mimetype;
		}
	
		if (mimetype)
			text += ' <span class="downloadLinkText MIMEType">[' + paella.dictionary.translate(mimetype) + ']' + '</span>';
		text += ': ' + trackText;
		if (resolution)
			text += ' <span class="downloadLinkText Resolution">(' + resolution + ')' + '</span>';
	
		return text;
	}
});
  

paella.plugins.downloadsPlugin = new paella.plugins.DownloadsPlugin();





paella.plugins.DownloadsEditorPlugin = Class.create(paella.editor.RightBarPlugin,{
	getSubclass:function() { return 'editorDownloadsTabBar'; },
	getName:function() { return 'es.upv.paella.matterhorn.editor.downloadsPlugin'; },
	getTabName:function() { return paella.dictionary.translate('Downloads'); },
	getIndex:function() { return 10001; },
	getDefaultToolTip:function() { return paella.dictionary.translate('Downloads'); },	
	
			
			
	checkEnabled:function(onSuccess) {
		onSuccess(true);
	},

	setup:function() {
		var mimeDict = {
			'video/avi':'AVI',
			'video/mp4':'MP4',
			'video/ogg':'OGG',
			'audio/mp3':'MP3',
			'audio/m4a':'M4A'
		};
		paella.dictionary.addDictionary(mimeDict);


		if (paella.utils.language()=="es") {
			var esDict = {
				'Downloads':'Descargas',
				'Video file':'Fichero de video',
				'Audio file':'Fichero de audio',
			};
			paella.dictionary.addDictionary(esDict);
		}
	},
	
		
	getContent:function() {	
		var root = document.createElement('div');
		root.className = "downloadsEditorTabBarContainer";

		var container = document.createElement('div');
		container.className = 'downloadsTabBarContainer';

		var tracks = paella.matterhorn.episode.mediapackage.media.track;
		if (!(tracks instanceof Array)) { tracks = [tracks]; }
		
		for (var i=0; i<tracks.length; ++i) {
			var track = tracks[i];
			paella.debug.log(track.type);
			container.appendChild(this.createLink(track, i));
		}
		
		root.appendChild(container);
		return root;
	},
	
	createLink:function(track, tabindexcount) {
		var elem = document.createElement('div');
		elem.className = 'downloadsLinkContainer';
		var link = document.createElement('a');
		link.className = 'downloadsLinkItem';
		link.innerHTML = this.getTextInfo(track);
		link.setAttribute('tabindex', 4000+tabindexcount);
		link.href = track.url;
		
		elem.appendChild(link);
		
		return elem;
	},
	
	getTextInfo:function(track){
		var text = '';
		
		if (track.video) {
			text = '<span class="downloadLinkText TypeFile Video">' + paella.dictionary.translate('Video file') + '</span>';
		}
		else if (track.audio){
			text = '<span class="downloadLinkText TypeFile Audio">' + paella.dictionary.translate('Audio file') + '</span>';
		}
		// track
		var trackText= '<span class="downloadLinkText Track">' + track.type + '</span>';
		
		// Resolution
		var resolution = '';
		if (track.video) {
			if ( track.video.resolution){
				resolution = track.video.resolution;
			}
			if (track.video.framerate){
				resolution +=  '@' + track.video.framerate + 'fps'; 
			}
		}
		
		// mimetype
		var mimetype = '';
		if (track.mimetype) {
			mimetype = track.mimetype;
		}
	
		if (mimetype)
			text += ' <span class="downloadLinkText MIMEType">[' + paella.dictionary.translate(mimetype) + ']' + '</span>';
		text += ': ' + trackText;
		if (resolution)
			text += ' <span class="downloadLinkText Resolution">(' + resolution + ')' + '</span>';
	
		return text;
	}	
	
});

paella.plugins.downloadsEditorPlugin = new paella.plugins.DownloadsEditorPlugin();


