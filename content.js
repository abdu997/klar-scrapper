const markers = {
    'Store Name':
        '#app > div > div.MuiStack-root > div > div > div > div > div > div.MuiStack-root > div.MuiStack-root > div > div > div > div.MuiBox-root > div.MuiStack-root > p',
    'Net Revenue':
        '#app > div > div.MuiBox-root > div.MuiBox-root > div:nth-child(2) > div > div:nth-child(1) > div > div > div > div:nth-child(1) > div > div > div:nth-child(2) > div > div.MuiBox-root > span:nth-child(1)',
    'Net Orders':
        '#app > div > div.MuiBox-root > div.MuiBox-root > div:nth-child(2) > div > div:nth-child(1) > div > div > div > div:nth-child(2) > div > div:nth-child(1) > div > div > div:nth-child(2) > div.MuiStack-root > div.MuiBox-root > span:nth-child(1)',
    NC: '#app > div > div.MuiBox-root > div.MuiBox-root > div:nth-child(2) > div > div:nth-child(1) > div > div > div > div:nth-child(2) > div > div:nth-child(1) > div > div > div:nth-child(2) > div.MuiStack-root > div.MuiBox-root > span:nth-child(1)',
    CM3: '#app > div > div.MuiBox-root > div.MuiBox-root > div:nth-child(2) > div > div:nth-child(1) > div > div > div > div:nth-child(2) > div > div:nth-child(3) > div > div > div:nth-child(2) > div.MuiStack-root > div.MuiBox-root > span:nth-child(1)',
    'Marketing Costs':
        '#app > div > div.MuiBox-root > div.MuiBox-root > div:nth-child(2) > div > div:nth-child(1) > div > div > div > div:nth-child(2) > div > div:nth-child(3) > div > div > div:nth-child(2) > div.MuiStack-root > div.MuiBox-root > span:nth-child(1)',
    MER: '#app > div > div.MuiBox-root > div.MuiBox-root > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(1) > div > div > div:nth-child(2) > div.MuiStack-root > div.MuiBox-root > span:nth-child(1)',
    aMER: '#app > div > div.MuiBox-root > div.MuiBox-root > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(2) > div > div > div:nth-child(2) > div.MuiStack-root > div.MuiBox-root > span:nth-child(1)',
    CAC: '#app > div > div.MuiBox-root > div.MuiBox-root > div:nth-child(2) > div > div:nth-child(2) > div > div > div > div:nth-child(2) > div > div:nth-child(3) > div > div > div:nth-child(2) > div.MuiStack-root > div.MuiBox-root > span:nth-child(1)',
};

// Create and style the export button
const button = document.createElement('button');
button.innerText = 'Export Klar Data';
button.style.position = 'fixed';
button.style.top = '20px';
button.style.right = '20px';
button.style.zIndex = 9999;
button.style.padding = '10px 15px';
button.style.backgroundColor = '#1976d2';
button.style.color = 'white';
button.style.border = 'none';
button.style.borderRadius = '4px';
button.style.cursor = 'pointer';
button.style.fontSize = '14px';
button.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';

function forceClick(el) {
    if (!el) return;
    const eventOpts = { bubbles: true, cancelable: true, view: window };
    el.dispatchEvent(new MouseEvent('mouseover', eventOpts));
    el.dispatchEvent(new MouseEvent('mousedown', eventOpts));
    el.dispatchEvent(new MouseEvent('mouseup', eventOpts));
    el.dispatchEvent(new MouseEvent('click', eventOpts));
}

function hoverOverElement(selector, duration = 3000) {
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`No element found for selector: ${selector}`);
    return;
  }

  // Create and dispatch mouseover and mouseenter
  const mouseOverEvent = new MouseEvent('mouseover', { bubbles: true, cancelable: true });
  const mouseEnterEvent = new MouseEvent('mouseenter', { bubbles: true, cancelable: true });

  element.dispatchEvent(mouseOverEvent);
  element.dispatchEvent(mouseEnterEvent);

  // After 'duration' ms, dispatch mouseout and mouseleave
  setTimeout(() => {
    const mouseOutEvent = new MouseEvent('mouseout', { bubbles: true, cancelable: true });
    const mouseLeaveEvent = new MouseEvent('mouseleave', { bubbles: true, cancelable: true });

    element.dispatchEvent(mouseOutEvent);
    element.dispatchEvent(mouseLeaveEvent);
  }, duration);
}


function wait(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

function getTableProductKPI() {
    // Get data rows
    const rows = [];
    const productNames = Array.from(
        document.querySelectorAll(
            "#app > div > div.MuiBox-root > div.MuiBox-root > div:nth-child(12) > div > div > div > div > div > div > div > div.MuiDataGrid-root.MuiDataGrid-root--densityCompact > div.MuiDataGrid-main > div:nth-child(2) > div > div > div.MuiDataGrid-pinnedColumns.MuiDataGrid-pinnedColumns--left > div > div > div"
        )
    ).map((el) => el.textContent.trim());
    const rowEls = document.querySelectorAll("#app > div > div.MuiBox-root > div.MuiBox-root > div:nth-child(12) > div > div > div > div > div > div > div > div.MuiDataGrid-root.MuiDataGrid-root--densityCompact > div.MuiDataGrid-main > div:nth-child(2) > div > div > div.MuiDataGrid-virtualScrollerRenderZone > div");
    
    for(let i = 0; i < rowEls.length; i++) {
        rows.push({
            'Product Name': productNames[i],
            'Net Revenue': rowEls[i].querySelector(`[data-colindex="1"] > div:nth-child(1)`).textContent.trim(),
            'Net Units Sold': rowEls[i].querySelector(`[data-colindex="2"] > div:nth-child(1)`).textContent.trim(),
            'Return %': rowEls[i].querySelector(`[data-colindex="3"] > div:nth-child(1)`).textContent.trim(),
            'Price Reduction %': rowEls[i].querySelector(`[data-colindex="4"] > div:nth-child(1)`).textContent.trim(),
            'Discount Code %': rowEls[i].querySelector(`[data-colindex="5"] > div:nth-child(1)`).textContent.trim(),
        })
    }

    return rows;
}

button.addEventListener('click', async () => {
    const now = new Date();
    const timestamp = now.toISOString();

    const data = {
        'Report Time': timestamp,
    };

    // Get report range
    hoverOverElement('#app > div > div.MuiBox-root > div.MuiBox-root > div.MuiBox-root > div > div > div.MuiStack-root > div.MuiBox-root > p');
    await wait(1);
    const rangeText = document.querySelector('body > div.MuiPopper-root.MuiTooltip-popper.MuiTooltip-popperInteractive.MuiTooltip-popperArrow > div > p').textContent.trim();
    const match = rangeText.match(/From (\d{2}\.\d{2}\.\d{4}) to (\d{2}\.\d{2}\.\d{4})/);

    if (match) {
        data.fromDate = match[1];
        data.toDate = match[2];
    }

    for (const [label, selector] of Object.entries(markers)) {
        const el = document.querySelector(selector);
        data[label] = el ? el.innerText.trim() : 'Not found';
    }

    // Step 1: Scroll to the bottom of the page
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

    // Set page to 100 rows
    forceClick(document.querySelector('#app > div > div.MuiBox-root > div.MuiBox-root > div:nth-child(12) > div > div > div > div > div > div > div > div.MuiDataGrid-root.MuiDataGrid-root--densityCompact > div:nth-child(3) > div > div > div > div > div.MuiInputBase-root.MuiInputBase-colorPrimary.MuiTablePagination-select.MuiSelect-root.MuiTablePagination-input > div '))
    await wait(1);
    forceClick(document.querySelector('#menu- > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation8.MuiPopover-paper.MuiMenu-paper > ul > li:nth-child(4)'))
    await wait(4);

    // Choose Product title & var
    forceClick(
        document.querySelector(
            '#app > div > div.MuiBox-root > div.MuiBox-root > div:nth-child(12) > div > div > div > div > div > div > div > div.MuiGrid2-root.MuiGrid2-container.MuiGrid2-direction-xs-row.MuiGrid2-spacing-xs-2 > div.MuiGrid2-root.MuiGrid2-direction-xs-row > div > div > div > div > div > div'
        )
    );
    await wait(1);
    forceClick(
        document.querySelector(
            '#menu- > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation8.MuiPopover-paper.MuiMenu-paper > ul > li:nth-child(3)'
        )
    );
    await wait(4);

    // // Sort by revenue
    // forceClick(document.querySelector("#app > div > div.MuiBox-root > div.MuiBox-root > div:nth-child(12) > div > div > div > div > div > div > div > div.MuiDataGrid-root.MuiDataGrid-root--densityCompact > div.MuiDataGrid-main > div.MuiDataGrid-columnHeaders > div.MuiDataGrid-columnHeadersInner > div > div.MuiDataGrid-columnHeader.MuiDataGrid-columnHeader--alignRight.MuiDataGrid-columnHeader--sortable.MuiDataGrid-columnHeader--sorted.MuiDataGrid-columnHeader--numeric.MuiDataGrid-withBorder > div.MuiDataGrid-columnHeaderDraggableContainer > div"))
    // await wait(1);


    data.productKPIByVariant = getTableProductKPI();

    // Send data to the webhook
    console.log("Sending data to webhook:", data);
    fetch("https://kennyhuynh.app.n8n.cloud/webhook/4665edfe-aba2-4c67-99ed-ecbc57ade5a9", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        alert("Data sent successfully!");
      } else {
        alert("Failed to send data.");
      }
    })
    .catch(error => {
      console.error("Error sending data:", error);
      alert("An error occurred while sending data.");
    });
});

document.body.appendChild(button);
