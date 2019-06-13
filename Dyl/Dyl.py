import sublime
import sublime_plugin

# class Dyl(sublime_plugin.EventListener):
dylTab = {
	'dyl': [
				['addDirArr\t向4个方向移动一格后获得的向量数组', 'addDirArr(${1:p})'],
				['log\t有颜色的输出', 'log(${1:colorStr}, ${2:data})'],
				['addDirIcon\t方向向量转箭头', 'addDirIcon(${1:dir})'],
				['addMap\t存放node的二维数组', 'addMap(${1:w}, ${2:h}, ${3:fun})'],
				['addMapLayer\t存放坐标的二维数组', 'addMapLayer(${1:w}, ${2:h}, ${3:d})'],
				['buffer\t操作缓冲,操作：add(data) del()', 'buffer(${1:执行操作的函数}, ${2:等待时间,超过会取消缓冲内容})'],
				['button\t把子节点改为button', 'button(${1:js})'],
				['data\t复制表格内容到其他对象上, _变量的值会被返回', 'data(${1:name}, ${2:node})'],
				['getSize\t获取节点的宽高，返回cc.p类型', 'getSize(${1:node})'],
				['fill\t数组填充', 'fill(${1:arr}, ${2:value}, ${3:start}, ${4:end})'],
				['key\t键盘事件', 'key(${1:{w:fun(isOn), dir:fun(isOn,dir)\}})'],
				['keyOn\t键盘按下事件', 'keyOn(${1:{w:fun(), dir:fun(dir)\}})'],
				['keyUp\t键盘弹起事件', 'keyUp(${1:{w:fun(), dir:fun(dir)\}})'],
				['load\t动态加载节点数组或者单节点', 'load(${1:preStr/arr}, ${2:arr/callBack}, ${3:callBack})'],
				['process\t流程结构,子流程end(js,funName,后面是参数列表)', 'process(${1:js}, ${2:arr})'],
				['rand\t随机函数', 'rand(${1:num})'],
				['read\t读取存档,如果变量名有_就代表是对象变量', 'read(${1:name})'],
				['setRand\t设置个人随机函数随机种子', 'setRand(${1:num})'],
				['save\t保存存档,如果变量名有_就代表是对象变量,数据为空就是删除', 'save(${1:name}, ${2:data})'],
				['update\t添加update函数,返回不为真就代表删除该函数，运行返回函数可以直接删除', 'update(${1:fun})'],
				['notify\t直接为对象属性加 notifyFun(newValue, oldValue)', 'notify(${1:node}, ${2:varName}, ${3:notifyFun})'],
				['counter\t计数器，counter(fun)->count(add = -1)', 'counter(${1:fun})'],
				['register\t操作寄存器，register(fun)->run(data),data=null表示动作结束', 'register(${1:fun})'],
			],

	'cc':  [
				['p\t坐标点', 'p(${1:x}, ${2:y})'],
				['director\t导演类', 'director'],
				['winSize\t当前窗口大小', 'winSize'],
				['instantiate\t实例化', 'instantiate({${1:prefab})'],
				['hexToColor\t用16进制生成color', 'hexToColor({${1:colorHex})'],
				['pPerp\t逆时针转90度', 'pPerp(${1:p})'],
				['pNeg\t取相反向量', 'pNeg(${1:p})'],
				['pRPerp\t顺时针转90度', 'pRPerp(${1:p})'],
				['pNormalize\t向量归一化', 'pNormalize(${1:p})'],
				['pToAngle\t向量转弧度', 'pToAngle(${1:p})'],
				['pFromSize\tSize转Vec2', 'pFromSize(${1:size})'],
				['pLerp\t两个向量间的lerp', 'pLerp(${1:p1}, ${2:p2}, ${3:lerpNum})'],
				['pFuzzyEqual\t两个向量是否相近', 'pFuzzyEqual(${1:p1}, ${2:p2}, ${3:最大差值})'],
				['pRotateByAngle\t向量旋转', 'pRotateByAngle(${1:v}, ${2:pivot}, ${3:angle})'],
				['pSameAs\t向量相等判断', 'pSameAs(${1:p1}, ${2:p2})'],
				['ParticleSystem\t粒子系统', 'ParticleSystem'],
				['ProgressBar\t进度条', 'ProgressBar'],
				['RigidBody\t刚体', 'RigidBody'],
				['Animation\t动画类', 'Animation'],
		   ],
	'director': [
				['loadScene\t加载场景,可添加回调函数', 'loadScene(${1:sceneName})'],
				['getScene\t当前场景,canvas的父节点', 'getScene()'],
		   ],
}

otherArr = [
	# ['function\t类函数定义', '${1:funName} (${2:}) \{\n	${3:}\n\},'],
	['progress\t进度条百分比', 'progress'],
	['onPreSolve\t接触更新时调用', 'onPreSolve'],
	['onEndContact\t停止接触时调用', 'onEndContact'],
	['onBeginContact\t开始接触时调用', 'onBeginContact'],
	['linearVelocity\t线性速度', 'linearVelocity'],
	['linearDamping\t衰减线性速度', 'linearDamping'],
	['getComponent\t获取组件', 'getComponent'],
	['pop\t数组函数，删除最后元素并返回这个值', 'pop()'],
	['shift\t数组函数，删除第一个元素并返回这个值', 'shift()'],
	['push\t数组函数，后面增加元素', 'push(${1:value})'],
	['unshift\t数组函数，前面增加元素', 'unshift(${1:value})'],
	['join\t数组函数，转字符串，参数是自定义分隔符', 'join()'],
	['slice\t数组函数，截取数组,end不填代表截取到最后', 'slice(${1:start}, ${2:end})'],
	['splice\t数组函数，删除，替换', 'splice(${1:index}, ${2:howmany}, ${3:item1...itemN})'],
	['undefined\t未定义', 'undefined'],
	# 下面的是常量
	# ['ease_add\t加速', '\"add\"'],
	# ['ease_sub\t减速', '\"sub\"'],
	# ['ease_addSub\t先加速再减速', '\"addSub\"'],
	# ['ease_backAdd\t先后退然后加速', '\"backAdd\"'],
	# ['ease_subBack\t快速移动超出然后后退', '\"subBack\"'],
	# ['ease_backAddSubBack\t先后退再加速超出然后后退', '\"backAddSubBack\"']
]

def getWords(view):
	reArr = view.find_all('[a-zA-Z_0-9]+')
	wordarr = []
	for value in reArr:
		wordarr.append(view.substr(value))	
	wordarr = list(set(wordarr))
	for i, value in enumerate(wordarr):
		wordarr[i] = [value, value]
	return wordarr


class Dyl(sublime_plugin.EventListener):
	def on_query_completions(self, view, prefix, locations):
		print("hahah")
		if view.settings().get('syntax') != 'Packages/JavaScript/JavaScript.sublime-syntax':
			return []
		ansArr = []
		for key in dylTab:
			# arr 是后面的匹配数组
			arr = dylTab[key]
			# ansArr 是需要返回的数组，也就是说需要从 arr上加工而成
			for i in arr:
				str1 = key + '.' + i[0]
				str2 = key + '.' + i[1]
				ansArr.append([str1, str2])
		point = locations[0]
		# point = self.view.sel()[0].a;
		# point = view.id()
		if view.substr(point - len(prefix) - 1) != '.':
			# ansArr = []
			# for key in dylTab:
			# 	ansArr.append([key, key])
			for key in otherArr:
				ansArr.append(key)
			newArr = getWords(view)
			for key in newArr:
				ansArr.append(key)
			return (ansArr, sublime.INHIBIT_WORD_COMPLETIONS | sublime.INHIBIT_EXPLICIT_COMPLETIONS)
		region = view.word(point - len(prefix) - 3)
		word = view.substr(region)
		for key in dylTab:
			if word == key:
				arr = dylTab[key]
				ansArr = []
				for i in arr:
					str1 = i[0]
					str2 = i[1]
					ansArr.append([str1, str2])
				print(ansArr)
				return (ansArr, sublime.INHIBIT_WORD_COMPLETIONS | sublime.INHIBIT_EXPLICIT_COMPLETIONS)
		return []
