async function assignToProject(github, context, columnId) {
	const issue_number = context.issue.number;
	console.log('issue_number', issue_number);

	try {
		// Get the issue to retrieve its ID
		const issue = await github.rest.issues.get({
			owner: context.repo.owner,
			repo: context.repo.repo,
			issue_number: issue_number,
		});

		// Create a card for the issue in the project column
		await github.rest.projects.createCard({
			column_id: columnId,
			content_id: issue.data.id,
			content_type: 'Issue',
		});

		console.log(`Issue ${issue_number} added to project column ${columnId}`);
	} catch (error) {
		console.error(`Error adding issue to project: ${error}`);
		throw error; // This will fail the workflow step
	}
}

module.exports = assignToProject;
