highlightActiveNavLink();

function highlightActiveNavLink() {
	const currentPath = window.location.pathname;
	const navLinks = document.querySelectorAll("nav .link");
	navLinks.forEach(link => {
		if (isLinkActive(link, currentPath)) {
			link.classList.add("active-link");
			return;
		}
	});
}

function isLinkActive(link, currentPath) {
	const href = link.getAttribute("href");
	return currentPath.startsWith(href);
}