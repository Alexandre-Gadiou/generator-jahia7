<%@ include file="../../common/declarations.jspf" %>

<!DOCTYPE html>
<html xml:lang="${renderContext.mainResourceLocale.language}">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>${fn:escapeXml(renderContext.mainResource.node.displayableName)}</title>

    <jcr:nodeProperty var="description" node="${renderContext.mainResource.node}" name="jcr:description" inherited="true"/>
	<c:if test="${not empty description}">
		<meta name="description" content="${fn:escapeXml(description.string)}">
	</c:if>
	<meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>

<div class="bodywrapper" itemscope itemtype="http://schema.org/WebPage">
    <template:area path="pagecontent"/>
</div>

<template:addResources type="css" resources="theme.css"/>

<script src="${url.currentModule}/javascript/main.js"></script>

</body>
</html>
