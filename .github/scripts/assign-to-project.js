/**
 * @param {import('@octokit/rest').Octokit} github
 * @param {import('actions-toolkit').ToolkitContext} context
 * @param {string} columnId
 */
async function assignToProject(github, context, columnId) {
	const issue_number = context.issue.number;
	console.log('issue_number', issue_number);
	console.log('columnId', columnId);

	console.log('------------- TRY FOR PROJECT ---------------');
	try {
		// Get the issue to retrieve its ID
		const issue = await github.rest.issues.get({
			owner: context.repo.owner,
			repo: context.repo.repo,
			issue_number: issue_number,
		});

		// Create a card for the issue in the project column
		await github.rest.projects.createCard({
			column_id: `${columnId}`,
			content_id: issue.data.id,
			content_type: 'Issue',
			note: 'this is note for the card',
		});

		console.log(`Issue ${issue_number} added to project column ${columnId}`);
	} catch (error) {
		console.error(`Error adding issue to project: ${error}`);
		throw error; // This will fail the workflow step
	}
}

module.exports = assignToProject;
// 63566722
// 63566722
