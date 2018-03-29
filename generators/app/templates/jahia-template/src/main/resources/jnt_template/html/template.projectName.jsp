<%@ include file="../../common/declarations.jspf" %>

<jcr:nodeProperty node="${renderContext.mainResource.node}" name="jcr:createdBy" inherited="true" var="author"/>
<c:set var="keywords" value="${jcr:getKeywords(renderContext.mainResource.node, true)}"/>
<jcr:nodeProperty var="description" node="${renderContext.mainResource.node}" name="jcr:description" inherited="true"/>


<!DOCTYPE html>
<html xml:lang="${renderContext.mainResourceLocale.language}">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>${fn:escapeXml(renderContext.mainResource.node.displayableName)}</title>

	<c:if test="${not empty description}">
		<meta name="description" content="${fn:escapeXml(description.string)}">
	</c:if>
	<c:if test="${!empty author}">
		<meta name="author" content="${fn:escapeXml(author.string)}"/>
	</c:if>
	<c:if test="${!empty keywords}">
		<meta name="keywords" content="${fn:escapeXml(keywords)}"/>
	</c:if>

	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>

<div class="bodywrapper ${templateCSS}" itemscope itemtype="http://schema.org/WebPage">

	<template:area path="navigation-menu-zone" nodeTypes="bootstrap4nt:navbar" listLimit="1"/>

	<section class="page-content">
		<div class="container">
			<template:area path="pagecontent"/>
		</div>
	</section>

</div>

<template:addResources type="css" resources="theme.css"/>

<script src="${url.currentModule}/javascript/main.js"></script>

</body>
</html>
