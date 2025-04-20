# GeoGebra Calculator Bookmarklet

## What is a Bookmarklet?

A bookmarklet is a small piece of JavaScript code stored as a browser bookmark. When you click the bookmark, the browser runs the JavaScript code on the current web page. This allows you to add custom functionality to your browser without installing extensions.

## What Does This Bookmarklet Do?

This bookmarklet provides a quick and convenient way to access GeoGebra's Scientific and Graphing calculators directly from any webpage. It creates a floating, draggable, and resizable window containing the selected GeoGebra calculator embedded via an iframe.

## Features

*   **Floating Window:** Opens GeoGebra in a popup window that stays on top of the current page content.
*   **Switch Calculators:** Easily toggle between GeoGebra's Scientific and Graphing calculators using dedicated buttons.
*   **Draggable & Resizable:** Move the window around the screen by dragging its header and resize it by dragging the bottom or right edges.
*   **State Persistence:** Remembers its last position, size, selected calculator type, theme, and window state (maximized/minimized) using your browser's `localStorage`. The state is restored the next time you open it on the same domain.
*   **Maximize/Restore:** Maximize the window to fill most of the screen or restore it to its previous size.
*   **Minimize:** Collapse the window into a small, draggable 'G' button. Click the button to restore the window.
*   **Dark/Light Theme:** Toggle between a light and dark theme. The dark theme inverts the colors of the GeoGebra iframe for better visibility.
*   **Close Functionality:** Close the window using the '✕' button or by clicking on the bookmark.

## How to Install

1.  **Go to [make-bookmarklets.com](https://make-bookmarklets.com/)** Copy the **entire content** of the [`bookmarklet.js`](bookmarklet.js) file (including the `javascript:` prefix) and paste it into the editor.
2.  **Click `Run Code`:** The calculator should pop up right away. If you're satisfied, continue to the next step.
3.  **Name:** Give the bookmark a name, for example, `GeoGebra Calc`.
4.  **Drag the bookmarklet to the bookmark bar:** Drag the red button with the name you just set onto the the bookmark bar (at the top of the page).
5.  **Boom! Your all set!:** Click on the bookmarklet when you need to use the handy geogebra calculator. A convenient app should popup on any webpage.

## How to Use

1.  Navigate to any webpage where you want to use the calculator.
2.  Click the bookmark you created.
3.  The GeoGebra calculator popup will appear.
4.  **Drag:** Click and hold the header bar to move the window.
5.  **Resize:** Click and drag the bottom right corner to resize.
6.  **Switch:** Use the `Sci` and `Graph` buttons (located on the top right) to switch between calculator types.
7.  **Theme:** Click the `🌙` / `☀️` button to toggle the theme.
8.  **Minimize:** Click the `_` button to minimize the window to a small 'G' icon. Click the 'G' icon to restore.
9.  **Maximize:** Click the `□` button to maximize. Click `❐` to restore.
10. **Close:** Click the `✕` button or the bookmark.

The bookmarklet will remember its state (size, position, etc.) for the next time you use it on the same website.


## Note

Some websites implement Content Security Policies (CSP) that prevent injecting arbitrary HTML or JavaScript into their pages. This is a security feature designed to protect users from cross-site scripting (XSS) attacks. Unfortunately bookmarklets would **not** work on those sites. (You could remake this into an extension though!)

## Credits

This was made for a YSWS program (Hacklet) from Hack club. Thank you for the awesome idea!!!