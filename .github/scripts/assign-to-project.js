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
		// get column
		console.log('list columns');
		const listColumnsRes = await listColumns(github, projectId);
		console.log('listColumnsRes', listColumnsRes);

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

async function listColumns(github, projectId) {
	try {
		const columns = await github.rest.projects.listColumns({
			project_id: projectId,
		});

		for (const column of columns.data) {
			console.log(`Column ID: ${column.id}, Column name: ${column.name}`);
		}
	} catch (error) {
		console.error(`Error listing columns: ${error}`);
	}
}
async function listCards(github, columnId) {
	try {
		const cards = await github.rest.projects.listCards({
			column_id: columnId,
		});

		for (const card of cards.data) {
			console.log(`Card ID: ${card.id}, Card note: ${card.note}`);
		}
	} catch (error) {
		console.error(`Error listing cards: ${error}`);
	}
}

module.exports = assignToProject;
// 63566722
// 63566722
